import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     loading: true,
  //     animal: "",
  //     breed: "",
  //     city: "",
  //     state: "",
  //     description: "",
  //     name: "",
  //   };
  // }

  // class properties
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );

    const json = await res.json();

    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }

  // TODO: 和 functional component相比，这里的event listener必须使用arrow function避免this指向的问题
  // 而functional component使用useState，闭包
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }

    const {
      animal,
      breed,
      city,
      state,
      description,
      name,
      images,
      showModal,
    } = this.state;

    return (
      // <ErrorBoundary/> 用在这里不行，因为如果上面的代码throw error，就执行不到这里
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
          {/* 使用Context.Consumer 或者 useContext */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            // Portal的作用：
            // Modal render在Details外面，但是可以引用Detail组件的state
            // Modal上的event可以在Details中被监听
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

// HOC
const DetailWithRouter = withRouter(Details);

// another HOC
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DetailWithRouter {...props} />
    </ErrorBoundary>
  );
}
