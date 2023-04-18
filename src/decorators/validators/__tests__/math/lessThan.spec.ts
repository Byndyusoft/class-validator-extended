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

import { LessThan } from "~/src";

interface IBoxProperties {
  readonly height: string | number;
  readonly width: string | number;
}

class Box {
  @LessThan("100")
  public readonly height!: string | number;

  @LessThan(100)
  public readonly width!: string | number;

  public constructor({ height, width }: IBoxProperties) {
    this.height = height;
    this.width = width;
  }
}

describe("decorators/validators/LessThan", () => {
  describe("when values are valid", () => {
    const cases: Array<{
      description: string;
      height: string | number;
      width: string | number;
    }> = [
      {
        description: "for number",
        height: -99.9,
        width: 99.9,
      },
      {
        description: "for string number",
        height: "99.9",
        width: "-99.9",
      },
    ];

    it.each(cases)(
      "does not have validation errors $description",
      async ({ height, width }) => {
        const box = new Box({ height, width });

        const validationErrors = await validate(box);

        expect(validationErrors).toHaveLength(0);
      },
    );
  });

  describe("when values are invalid", () => {
    const cases: Array<{
      description: string;
      height: string | number;
      width: string | number;
    }> = [
      {
        description: "for number",
        height: 100,
        width: 100.1,
      },
      {
        description: "for string number",
        height: "100",
        width: "100.1",
      },
    ];

    it.each(cases)(
      "returns validation errors $description",
      async ({ height, width }) => {
        const box = new Box({ height, width });

        const validationErrors = await validate(box);

        expect(validationErrors).toBeArrayOfSize(2);

        expect(validationErrors).toSatisfyAll((error: ValidationError) => {
          if (!error.constraints) {
            return false;
          }

          return "lessThan" in error.constraints;
        });
      },
    );
  });
});
