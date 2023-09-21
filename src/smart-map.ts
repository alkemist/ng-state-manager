export class SmartMap<V> extends Map<string, V> {
    private readonly _keys: string[] = [];
    private readonly _values: V[] = [];

    constructor(entries: [ string, V ][] = []) {
        super(entries);
        this._keys = entries.map(value => value[0]);
        this._values = entries.map(value => value[1]);
    }

    get(key: string): V {
        return <V>super.get(key);
    }

    set(key: string, value: V): this {
        if (this.has(key)) {
            const keyIndex = this._keys.indexOf(key);
            this._values[keyIndex] = value;
        } else {
            this._keys.push(key);
            this._values.push(value);
        }

        super.set(key, value);
        return this;
    }

    getKeys(): string[] {
        return this._keys;
    }

    getValues(): V[] {
        return this._values;
    }

    map(predicate: (value: V, index: string, indexNumber: number) => V) {
        return this._keys.map((key, index) =>
            predicate(this._values[index], key, index)
        )
    }

    each(predicate: (value: V, index: string, indexNumber: number) => void) {
        this._keys.forEach((key, index) => {
            predicate(this._values[index], key, index);
        })
    }

    find(predicate: (value: V, index: string, indexNumber: number) => boolean) {
        return this._values.find((value, index) =>
            predicate(value, this._keys[index], index)
        );
    }

    filter(predicate: (value: V, index: string, indexNumber: number) => boolean) {
        const newSmartMap = new SmartMap<V>();
        this._keys.filter((key, index) =>
            predicate(this._values[index], key, index)
        ).forEach(
            key => newSmartMap.set(key, this.get(key))
        )
        return newSmartMap;
    }
}