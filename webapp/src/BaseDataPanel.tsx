import * as React from "react";
import { defaultPrivateKey, defaultPublicKey } from "./baseDappPostForm";

export class BaseDataPanel extends React.Component<{}, { content: [], customScope: string,  privateKey: string, publicKey: string }> {
    interval: number;

    constructor(props: {}) {
        super(props);
        this.state = { content: [], customScope: '', privateKey:  defaultPrivateKey, publicKey: defaultPublicKey };
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

    renderStrinList(arrayToParse: string[]) {
        return arrayToParse.map((arrayElement: string) => {
            return (arrayElement + ' ');
        });
    }

    renderIpfsStringList(arrayToParse: string[]) {
        return arrayToParse.map((arrayElement: string) => {
            return ( 
            <div>
                <a href={`https://ipfs.io/ipfs/${arrayElement}`}>Download</a> &nbsp;
            </div>
            )
        });
    }

}
