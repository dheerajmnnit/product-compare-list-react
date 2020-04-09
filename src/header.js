import React from 'react';

export class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="title-box">
                    <p>Compare Products<br></br></p>
                </div>
                <div className="user-box">
                    <p>Hello, <br></br>User</p>
                </div>

            </header>
        )
    }
}