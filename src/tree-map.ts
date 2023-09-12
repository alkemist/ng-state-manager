export class TreeMap extends Map<string, Map<string, any>> {
    setChild<V>(parentKey: string, childKey: string, childValue: V): this {
        let map = this.has(parentKey)
            ? this.get(parentKey)!
            : new Map<string, V>();

        map.set(childKey, childValue);
        return this;
    }
}