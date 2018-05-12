export default interface CheckLessee {
    exists(lesseeUuid: string): Promise<boolean>;
}