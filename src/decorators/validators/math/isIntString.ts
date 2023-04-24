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

import {
  buildMessage,
  isString,
  ValidateBy,
  ValidationOptions,
} from "class-validator";
import { Decimal } from "decimal.js";

const isIntString = (value: unknown): boolean => {
  try {
    return isString(value) && new Decimal(value).isInt();
  } catch {
    return false;
  }
};

export function IsIntString(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: "isIntString",
      validator: {
        validate: (value): boolean => isIntString(value),
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix}$property must be a string integer`,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
