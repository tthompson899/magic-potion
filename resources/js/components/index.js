import React from 'react';
import ReactDOM from 'react-dom';

function Welcome() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Yo Yo Yo</div>

                        <div className="card-body">I've made it to React!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;

if (document.getElementById('welcome')) {
    ReactDOM.render(<Welcome />, document.getElementById('welcome'));
}
