import { connect } from 'react-redux';
import { App } from '../components';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
