const takeNoArgs = (method) => function() {
  return method(this.props);
};

const takeFirstArg = (method) => function(nextProps) {
  return method(this.props, nextProps);
};

const methodCreators = {
  componentWillMount: takeNoArgs,
  componentDidMount: takeNoArgs,
  componentWillReceiveProps: takeFirstArg,
  shouldComponentUpdate: takeFirstArg,
  componentWillUpdate: takeFirstArg,
  componentDidUpdate: takeFirstArg,
  componentWillUnmount: takeNoArgs
};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(methodCreators);
}

export default methodCreators;
