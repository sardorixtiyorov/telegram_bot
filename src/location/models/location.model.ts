import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface locationAttr {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
}

@Table({ tableName: 'locations' })
export class Location extends Model<Location, locationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  longitude: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  latitude: number;
}
