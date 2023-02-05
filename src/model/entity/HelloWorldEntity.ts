import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hello_world_table' })
export class HelloWorldEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 500, comment: '测试名称' })
    name: string;

    @Column('text', { nullable: true, comment: '测试描述' })
    desc: string;

    @Column('int', { nullable: true, comment: '测试年龄' })
    age: number;

    @Column('int', { default: 0, comment: '是否删除' })
    isDelete: number;

    @Column('varchar', { default: null, nullable: true })
    crateTime: string;

    @Column('varchar', { default: null, nullable: true })
    updateTime: string;

    @Column('timestamp', { default: null, nullable: true })
    deleteTime: string;
}
