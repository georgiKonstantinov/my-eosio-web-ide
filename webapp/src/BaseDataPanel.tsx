import * as React from "react";
import { rpc } from "./baseDappPostForm";

export class BaseDataPanel extends React.Component<{}, { content: [], custom_scope: string }> {
    interval: number;

    constructor(props: {}) {
        super(props);
        this.state = { content: [], custom_scope: '' };
    }

    async setContent() {

    }

    componentDidMount() {
        this.interval = window.setInterval(async () => {
            this.setContent();
        }, 200);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <code><pre>{this.state.content}</pre></code>

    }
}
