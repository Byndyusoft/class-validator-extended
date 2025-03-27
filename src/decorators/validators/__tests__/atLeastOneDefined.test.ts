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

import { IsOptional, IsString, validate } from "class-validator";

import { AtLeastOneDefined } from "~/src";

function getUserClass(properties?: string[]): {
  new (): {
    email?: string;
    name?: string;
  };
} {
  class User {
    @IsString()
    @IsOptional()
    public readonly email?: string;

    @IsString()
    @IsOptional()
    public readonly name?: string;

    @AtLeastOneDefined(properties)
    protected readonly _atLeastOneDefined?: unknown;
  }

  return User;
}

describe("decorators/validators/AtLeastOneDefined", () => {
  it("must forbid empty user", async () => {
    const user = new (getUserClass())();

    const validationErrors = await validate(user);

    expect(validationErrors).toMatchSnapshot();
  });

  it("must forbid user if some properties not defined", async () => {
    const user = new (getUserClass(["email", "name"]))();

    const validationErrors = await validate(user);

    expect(validationErrors).toMatchSnapshot();
  });
});
