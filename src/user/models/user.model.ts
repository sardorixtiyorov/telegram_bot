import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface userAttr {
  id: number;
  tg_id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, userAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  tg_id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_bot: boolean;

  @Column({ type: DataType.STRING(256), allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING(256) })
  last_name: string;

  @Column({ type: DataType.STRING(256) })
  username: string;
}
