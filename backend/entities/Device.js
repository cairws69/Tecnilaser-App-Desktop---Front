import { EntitySchema } from 'typeorm';

export const Device = new EntitySchema({
  name: 'Device',
  tableName: 'devices',
  columns: {
    id: {
      primary: true,
      type: 'varchar',
      generated: false,
    },
    clientId: {
      type: 'varchar',
      nullable: false,
    },
    clientName: {
      type: 'varchar',
      nullable: false,
    },
    clientAddress: {
      type: 'varchar',
      nullable: true,
    },
    clientNeighborhood: {
      type: 'varchar',
      nullable: true,
    },
    clientPhone: {
      type: 'varchar',
      nullable: false,
    },
    device: {
      type: 'varchar',
      nullable: false,
    },
    model: {
      type: 'varchar',
      nullable: true,
    },
    defect: {
      type: 'varchar',
      nullable: false,
    },
    voltage: {
      type: 'varchar',
      default: '110',
    },
    repair: {
      type: 'varchar',
      nullable: true,
    },
    budget: {
      type: 'varchar',
      nullable: true,
    },
    entryDate: {
      type: 'varchar',
      nullable: false,
    },
    promisedDate: {
      type: 'varchar',
      nullable: true,
    },
    observation: {
      type: 'text',
      nullable: true,
    },
    accepted: {
      type: 'varchar',
      default: 'não',
    },
    completionDate: {
      type: 'varchar',
      nullable: true,
    },
    exitDate: {
      type: 'varchar',
      nullable: true,
    },
    status: {
      type: 'varchar',
      default: 'Aguardando',
    },
    warranty: {
      type: 'text',
      nullable: true,
    },
    downloaded: {
      type: 'boolean',
      default: false,
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
    client: {
      type: 'many-to-one',
      target: 'Client',
      joinColumn: {
        name: 'clientId',
        referencedColumnName: 'id',
      },
    },
  },
});