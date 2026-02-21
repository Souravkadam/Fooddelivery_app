import React from 'react';

const Sidebar = () => {
  return (
  <div className="border-end bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
                <div className="list-group list-group-flush">
                    <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Dashboard</a>
                    <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Shortcuts</a>
                    <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Overview</a>
                    <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Events</a>
                    <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Profile</a>
                    <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Status</a>
                </div>
            </div>
     )
}

export default Sidebar;