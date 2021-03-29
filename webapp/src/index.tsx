import * as React from "react";
import * as ReactDOM from "react-dom";
import { AdminWindow } from "./adminWindow";
import { UserWindow } from "./userWindow"

interface MainWindowState {
    showAdminWindow: boolean,
    showUserWindow: boolean,
};

class MainWindow extends React.Component<{}, MainWindowState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            showAdminWindow: false,
            showUserWindow: true,
        };
        this.showComponent = this.showComponent.bind(this);
    }

    showComponent(name = "") {
        this.setState({ showAdminWindow: false, showUserWindow: false });
        switch (name) {
            case "showUserWindow":
                this.setState({ showUserWindow: true });
                break;
            case "showAdminWindow":
                this.setState({ showAdminWindow: true });
                break;
            default:
                null;
        }
    }

    render() {
        const { showAdminWindow, showUserWindow } = this.state;
        return <div>
            {showUserWindow && <table>
                <tbody>
                    <tr>
                        <UserWindow />
                    </tr>

                </tbody>
            </table>}

            {showAdminWindow && <table>
                <tbody>
                    <tr>
                        <AdminWindow />
                    </tr>

                </tbody>
            </table>}
            < br />
            <ul>
                <li className="small"><a className={this.state.showAdminWindow ? "smallClicked" : "smallNotClicked"} onClick={() => this.showComponent("showAdminWindow")}>Admin View</a></li>
                <li className="small"><a className={this.state.showUserWindow ? "smallClicked" : "smallNotClicked"} onClick={() => this.showComponent("showUserWindow")}>User View</a></li>
            </ul>
        </div>;
    }
}



ReactDOM.render(

    <div> <MainWindow /></div>,

    document.getElementById("RootMainWindow")
);
