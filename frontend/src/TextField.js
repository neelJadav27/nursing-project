import React from 'react';
class TextField extends React.Component {
  render() {
    return (
      <div className="TextField">
        <input
          className='TextField'
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
        />
      </div>
    );
  }
}

export default TextField;
