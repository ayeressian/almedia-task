import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraintInterface,
  ValidationArguments,
  validate,
  ValidationError,
  ValidatorConstraint,
} from 'class-validator';
import { ClassConstructor, plainToClass } from '@nestjs/class-transformer';

//https://github.com/typestack/class-validator/issues/1011#issuecomment-843978403

@ValidatorConstraint()
export class IsNestedElementsConstraint
  implements ValidatorConstraintInterface
{
  constructor(private typeRef: ClassConstructor<any>) {}

  async validate(value: any): Promise<boolean> {
    const validations: Promise<ValidationError[]>[] = [];
    Object.entries(value).forEach((entry) => {
      validations.push(validate(plainToClass(this.typeRef, entry[1])));
    });

    const process = await Promise.all(validations);
    return process.every((p) => p.length <= 0);
  }

  defaultMessage(
    validationArguments?: ValidationArguments | undefined,
  ): string {
    return `${validationArguments?.property} error`;
  }
}

const IsNestedElements = (
  type: ClassConstructor<any>,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsNestedElementsConstraint',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: new IsNestedElementsConstraint(type),
    });
  };
};

export default IsNestedElements;
