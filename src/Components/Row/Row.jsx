import React, { Component } from 'react';
import cN from 'classnames';
import showdown from 'showdown';

const converter = new showdown.Converter();
import s from './Row.css';

export default class Row extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { open } = this.state;
    const { name, camara, partido, foto, twitter, perfilDeQuienEsQuien, perfilito } = this.props;
    const photo = (foto) ? foto : 'http://archivo.lasillavacia.com/archivos/historias/odebrecht/15.jpg';
    return (
      <div tabIndex={0} className={cN(s.root, { [s.open]: open })} onClick={this.handleClick}>
        <div className={s.inner}>
          <div className={s.photo} style={{ backgroundImage: `url('${photo}')` }} />
          <div className={s.name}>
            {name}
          </div>
          <div className={s.social}>
            {(twitter) ?
              <a href={`https://twitter.com/${twitter}`} target='_blank' rel={'noreferer'}>{twitter}</a>
              : false}
            {(twitter && perfilDeQuienEsQuien) ? ' - ' : false}
            {(perfilDeQuienEsQuien) ?
              <a href={perfilDeQuienEsQuien} target='_blank' rel={'noreferer'}>Quien es quien</a>
              : false}
          </div>
          <footer className={s.footer}>
            <div className={s.camara}>
              {camara}
            </div>
            <div className={s.partido}>
              {partido}
            </div>
          </footer>
        </div>
        {(open) ?
          <div className={s.popup}>
            <div className={s.popup__inner}>

              <button className={s.close_btn}>
                <svg width="41px" height="41px" viewBox="0 0 41 41">
                  <rect transform="translate(21.500000, 21.500000) rotate(45.000000) translate(-21.500000, -21.500000) "
                        x="-6" y="20" width="55" height="3" />
                  <rect
                    transform="translate(21.500000, 21.500000) rotate(135.000000) translate(-21.500000, -21.500000) "
                    x="-6" y="20" width="55" height="3" />

                </svg>
              </button>

              <header className={s.popup__header}>
                <div className={s.photo} style={{ backgroundImage: `url('${photo}')` }} />
                <div className={s.name}>
                  {name}
                </div>
              </header>
              <article className={s.content} dangerouslySetInnerHTML={{ __html: converter.makeHtml(perfilito) }} />
            </div>
          </div>
          : false}
      </div>
    );
  }
}