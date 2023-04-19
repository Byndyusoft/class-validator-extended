/*
 * Copyright 2023 Byndyusoft
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

import { buildMessage, ValidateBy, ValidationOptions } from "class-validator";
import { Decimal } from "decimal.js";

const lessThanOrEqualTo = (
  value: unknown,
  maxValue: number | string,
): boolean => {
  try {
    return new Decimal(value as number | string).lessThanOrEqualTo(maxValue);
  } catch {
    return false;
  }
};

export function LessThanOrEqualTo(
  maxValue: number | string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: "lessThanOrEqualTo",
      constraints: [maxValue],
      validator: {
        validate: (value, args): boolean =>
          lessThanOrEqualTo(value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            `${eachPrefix}$property must be less or equal than $constraint1`,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}