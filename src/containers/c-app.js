import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { bindActionCreators } from 'redux';
import Body from '../components/p-Body';
import * as taskActions from '../actions/a-index';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function mapStateToProps(state)  {
  return {
    state: fromJS(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(taskActions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Body);