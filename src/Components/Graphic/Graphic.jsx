import { h, render, Component } from 'preact';
import s from './Graphic.css';

export default class Graphic extends Component {
  handleClick(name) {
    alert(`Just clicked on ${name}!`);
  }

  getCircles() {
    // Get the data from the attribute
    const { data } = this.props;

    // Loop through the data
    return data.map((item, key) => {
        const { name, value } = item;

        // Calculate a width and height for the element
        const size = value * 3;
        const style = {
          width: size,
          height: size
        };

        // Return the element. If you click on it run the handleClick function
        return (
          <button className={s.circle} key={key} style={style} onClick={this.handleClick.bind(false, name)}>{name}</button>
        )
      }
    );
  }

  render(props, state) {
    const circles = this.getCircles();

    return (
      <div className={s.container}>
        {circles}
      </div>
    )
  }
}