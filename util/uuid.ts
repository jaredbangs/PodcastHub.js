export class UUID {
    public static random(): string {
        return crypto.randomUUID();
    }
}