"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230623145943 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230623145943 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "title" type text using ("title"::text);');
    }
    async down() {
        this.addSql('alter table "post" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));');
        this.addSql('alter table "post" alter column "updated_at" type varchar(255) using ("updated_at"::varchar(255));');
        this.addSql('alter table "post" alter column "title" type varchar(255) using ("title"::varchar(255));');
    }
}
exports.Migration20230623145943 = Migration20230623145943;
//# sourceMappingURL=Migration20230623145943.js.map