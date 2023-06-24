import { PrimaryKey, Property, Entity } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ type: "date" })
  createdAt? = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt? = new Date();

  @Property({ type: "text", unique: true })
  username!: string;

  @Property({ type: "text" })
  password!: string;
}
