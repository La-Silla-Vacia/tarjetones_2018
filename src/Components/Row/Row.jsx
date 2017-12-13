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
    const { nombres, apellido1, apellido2, camara, partido, foto, twitter, perfilDeQuienEsQuien, perfilito } = this.props;
    const photo = (foto) ? foto : 'http://archivo.lasillavacia.com/archivos/historias/odebrecht/15.jpg';
    return (
      <div tabIndex={0} className={cN(s.root, { [s.open]: open })} onClick={this.handleClick}>
        <div className={s.inner}>
          <img className={s.photo} src={photo} alt='' />
          <div>
            <div className={s.name}>
              {nombres} {apellido1} {apellido2}
            </div>
            <div className={s.social}>
              {(twitter) ?
                <a href={`https://twitter.com/${twitter}`} target='_blank' rel={'noreferer'}>{twitter}</a>
                : false}
              {(twitter && perfilDeQuienEsQuien) ? ' - ' : false}
              {(perfilDeQuienEsQuien) ?
                <a href={perfilDeQuienEsQuien}>Quien es quien</a>
                : false}
            </div>
            <footer className={s.footer}>
              <div className={s.camara}>
                <div className={s.headline}>Cámara</div>
                {camara}
              </div>
              <div className={s.partido}>
                <div className={s.headline}>Partido</div>
                {partido}
              </div>
            </footer>
          </div>
        </div>
        {(open) ?
          <div className={s.popup}>
            <div className={s.popup__inner}>
              <header className={s.popup__header}>
                <img className={s.photo} src={photo} alt='' />
                <div className={s.name}>
                  {nombres} {apellido1} {apellido2}
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