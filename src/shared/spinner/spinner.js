import React from 'react';

const Spinner = () => {
    return (
        <div className="spinner-wrapper">
            <div className="spinner spinner-border text-secondary" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    );
};

export default Spinner;
