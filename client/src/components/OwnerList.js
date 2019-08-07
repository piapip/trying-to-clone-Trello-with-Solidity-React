import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

class OwnerList extends Component {

  // _revokePermission = (event) => {
  //   this.props._revokePermission(this.props.ownersAddress[event.target.value], this.props.jobId)
  // }

  render() {
    let count = 0;
    const printOwners =
      this.props.sharedOwners.map(owner => {
        count++;
        if (count === 1) {
          return (
            <td key={owner + "" + count}>
              <Button /*onClick={this._revokePermission}*/ value={count - 1}>Boss</Button>
            </td>
          )
        } else {
          return (<td key={owner + "" + count}>
            <Button /*onClick={this._revokePermission}*/ value={count - 1}>{owner}</Button>
          </td>)
        }
      })

    return (
      <div className="float-right" >
        <Table>
          <tbody><tr>
            {printOwners}
          </tr></tbody>
        </Table>
      </div>
    );
  }
}

export default OwnerList;