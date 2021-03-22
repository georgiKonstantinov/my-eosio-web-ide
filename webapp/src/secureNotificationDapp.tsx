import * as React from "react";
import { BaseDappPostForm, rpc } from "./baseDappPostForm";
import { BaseDataPanel } from "./BaseDataPanel";


interface PostDataSecureNotification {
    id?: number;
    sender?: string;
    receiver?: string;
    message?: string;
    component?: number;
};


export class PostFormSecureNotification extends BaseDappPostForm<PostDataSecureNotification> {
    constructor(props: {}) {
        super(props);
        this.state = {
            privateKey: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
            data: {
                id: 0,
                sender: '',
                receiver: '',
                message: '',
                component: 1000,
            },
            error: '',
        };
    }

    render() {
        return <div>
            <table>
                <tbody>
                    <tr>
                        <td>Private Key</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.privateKey}
                            onChange={e => this.setState({ privateKey: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Sender</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.sender}
                            onChange={e => this.setData({ sender: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Reciever</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.receiver}
                            onChange={e => this.setData({ receiver: e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Component ID</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.component}
                            onChange={e => this.setData({ component: +e.target.value })}
                        /></td>
                    </tr>
                    <tr>
                        <td>Message</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.data.message}
                            onChange={e => this.setData({ message: e.target.value })}
                        /></td>
                    </tr>


                </tbody>
            </table>
            <br />
            <button onClick={e => this.post(this.state.data.sender, 'slm.notify')}>Notify</button>
            {this.state.error && <div>
                <br />
                Error:
                <code><pre>{this.state.error}</pre></code>
            </div>}

        </div>;
    }
}

export class SecureNotificationData extends BaseDataPanel {
    interval: number;

    constructor(props: {}) {
        super(props);
        this.state = { content: '///', custom_scope: 'slm.notify' };
    }

    async setContent() {
        const rows = await rpc.get_table_rows({
            json: true, code: 'slm.notify', scope: this.state.custom_scope, table: 'slmsecnotify', limit: 1000,
        });
        let content =
            'id                Sender          Component ID       Message\n' +
            '\n';
        for (let row of rows.rows)
            content +=
                (row.id + '').padEnd(16) +
                (row.sender).padEnd(20) + '  ' +
                (row.component + '').padEnd(15) +
                (row.message).padEnd(12) + '\n';
        this.setState({ content });
    }
}

export class PrivateSecureNotificationData extends SecureNotificationData {
    interval: number;

    constructor(props: {}) {
        super(props);
        this.state = { content: '///', custom_scope: 'slm.customer' };
    }

    render() {
        return <div>
            <br />
            <table style={{ border: "hidden" }}>
                <tbody>
                    <tr>
                        <td>Account</td>
                        <td><input
                            style={{ width: 500 }}
                            value={this.state.custom_scope}
                            onChange={e => this.setState({ custom_scope: e.target.value })}
                        /></td>
                    </tr>
                </tbody>
            </table>

            <code><pre>{this.state.content}</pre></code>
        </div>
    }
}