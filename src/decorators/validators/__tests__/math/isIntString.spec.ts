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

import { validate, ValidationError } from "class-validator";

import { IsIntString } from "~/src";

class Box {
  @IsIntString()
  public readonly height!: string | number;

  public constructor(height: string | number) {
    this.height = height;
  }
}

describe("decorators/validators/IsIntString", () => {
  describe("when values are valid", () => {
    const cases: Array<{
      description: string;
      height: string | number;
    }> = [
      {
        description: "for number",
        height: -99,
      },
      {
        description: "for string number",
        height: "-99",
      },
    ];

    it.each(cases)(
      "does not have validation errors $description",
      async ({ height }) => {
        const box = new Box(height);

        const validationErrors = await validate(box);

        expect(validationErrors).toHaveLength(0);
      },
    );
  });

  describe("when values are invalid", () => {
    const cases: Array<{
      description: string;
      height: string | number;
    }> = [
      {
        description: "for number",
        height: 100.1,
      },
      {
        description: "for string number",
        height: "100.1",
      },
      {
        description: "for wrong types",
        height: "abc",
      },
    ];

    it.each(cases)(
      "returns validation errors $description",
      async ({ height }) => {
        const box = new Box(height);

        const validationErrors = await validate(box);

        expect(validationErrors).toBeArrayOfSize(1);

        expect(validationErrors).toSatisfyAll((error: ValidationError) => {
          if (!error.constraints) {
            return false;
          }

          return "isIntString" in error.constraints;
        });
      },
    );
  });
});
