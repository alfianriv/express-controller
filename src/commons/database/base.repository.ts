export class BaseRepository<
  T extends { id: number; createdAt: Date; updatedAt?: Date; deletedAt?: Date },
> {
  private datas: T[] = [];

  constructor() {}

  findAll(): T[] {
    return this.datas.filter((data) => !data.deletedAt);
  }

  findOne(where: { [K in keyof T]?: any }): T | null {
    return this.datas.find((data) => {
      for (const key in where) {
        if (data[key] !== where[key]) {
          return false;
        }
      }
      return true;
    }) as T;
  }

  create(data: Partial<T>): T {
    if (!data.id) {
      data.id = this.datas.length + 1;
    }
    data.createdAt = new Date();
    data.updatedAt = new Date();
    this.datas.push(data as T);
    return data as T;
  }

  update(id: number, updateData: Partial<T>): T {
    const data = this.findOne({ id } as any);
    Object.assign(data, updateData);
    data.updatedAt = new Date();
    this.datas = this.datas.map((data) => (data.id === id ? data : data));
    return data as T;
  }

  delete(id: number): void {
    const data = this.findOne({ id } as any);
    data.deletedAt = new Date();
    this.update(id, data);
  }
}
