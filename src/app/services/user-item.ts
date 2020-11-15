export class UserItem {
    accessToken?: string;
    id?: string;

    UserItem(accessToken = null, id = null) {
        this.accessToken = accessToken;
        this.id = id;
    }
}
