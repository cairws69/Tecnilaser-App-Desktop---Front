import { EntitySchema } from 'typeorm';

export const Client = new EntitySchema({
  name: 'Client',
  tableName: 'clients',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: false,
    },
    name: {
      type: 'varchar',
      nullable: false,
    },
    email: {
      type: 'varchar',
      nullable: false,
    },
    phone: {
      type: 'varchar',
      nullable: false,
    },
    dateOfBirth: {
      type: 'varchar',
      nullable: true,
    },
    rg: {
      type: 'varchar',
      nullable: true,
    },
    postalCode: {
      type: 'varchar',
      nullable: true,
    },
    address: {
      type: 'varchar',
      nullable: true,
    },
    neighborhood: {
      type: 'varchar',
      nullable: true,
    },
    city: {
      type: 'varchar',
      nullable: true,
    },
    state: {
      type: 'varchar',
      nullable: true,
    },
    registrationDate: {
      type: 'varchar',
      nullable: false,
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true,
    },
  },
  relations: {
    devices: {
      type: 'one-to-many',
      target: 'Device',
      inverseSide: 'client',
    },
  },
});
