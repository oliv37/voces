const STORAGE_TYPES = ['WORDS_GROUP_COMPLETION'] as const;

export type StorageType = (typeof STORAGE_TYPES)[number];

export class StorageKey {
  private static readonly DELIMITER = '--';

  constructor(
    public readonly type: StorageType,
    public readonly id: string | number
  ) {}

  toString(): string {
    return `${this.type}${StorageKey.DELIMITER}${this.id}`;
  }

  static fromString(key: string): StorageKey | null {
    const [type, id] = key.split(StorageKey.DELIMITER) as [StorageType, string];
    if (type == undefined || id == undefined || !STORAGE_TYPES.includes(type)) {
      return null;
    }
    return new StorageKey(type, id);
  }
}
