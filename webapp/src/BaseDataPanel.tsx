import * as React from "react";
import { rpc } from "./baseDappPostForm";

export class BaseDataPanel extends React.Component<{}, { content: any, custom_scope: string }> {
    interval: number;

    constructor(props: {}) {
        super(props);
        this.state = { content: '///', custom_scope: '' };
    }

    async setContent() {

    }

    componentDidMount() {
        this.interval = window.setInterval(async () => {
            try {
                this.setContent();
            } catch (e) {
                if (e.json)
                    this.setState({ content: JSON.stringify(e.json, null, 4) });
                else
                    this.setState({ content: '' + e });
            }

        }, 200);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <code><pre>{this.state.content}</pre></code>

    }
}
