/*
 * Copyright 2021 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import _ from "lodash";

export function AtLeastOneDefined<T>(
  properties?: Array<Extract<keyof T, string>>,
  validationOptions?: Omit<ValidationOptions, "each">,
): PropertyDecorator {
  return function (target, propertyName): void {
    registerDecorator({
      name: "atLeastOneDefined",
      target: target.constructor,
      propertyName: propertyName as string,
      constraints: properties,
      options: validationOptions,
      validator: {
        validate(_value: unknown, args: ValidationArguments) {
          const constraints = args.constraints as string[] | undefined;

          if (_.isNil(constraints) || constraints.length === 0) {
            return !_.isEmpty(args.object);
          }

          return constraints.some(
            (key) =>
              (args.object as Record<string, unknown>)[key] !== undefined,
          );
        },

        defaultMessage(args: ValidationArguments): string {
          const constraints = args.constraints as string[] | undefined;

          return _.isNil(constraints) || constraints.length === 0
            ? "at least one property in $target must be defined"
            : `at least one property in $target of ${constraints
                .map((x) => `'${x}'`)
                .join(", ")} must be defined`;
        },
      },
    });
  };
}
