import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// function LinearProgressWithLabel(props) {
    
//   return (
//     <Box display="flex" alignItems="center">
//       <Box width="80%" mr={4} ml={4}>
//         <LinearProgress variant="determinate" value={progress} />
//       </Box>
//       <Box minWidth={35}>
//         <Typography variant="body2" color={`${props.color}`}>{`${progress}% Completed`}</Typography>
//       </Box>
//     </Box>
//   );
// }

// const useStyles = makeStyles({
//     root: {
//       width: '100%',
//       marginTop:30,
//       marginBottom:30,
        
//     },
//   });
  
//  const ProgressBar = (props) => {
//     const classes = useStyles();
//     const [progress, setProgress] = React.useState(0);
   
  
//     return (
//       <div className={classes.root}>
//        <Box display="flex" justifyContent="center" alignItems="center">
//       <Box width="60%" mr={4} ml={4}>
//         <LinearProgress variant="determinate" className={`text-${props.color}`} value={props.progress} />
//       </Box>
//       <Box minWidth={35}>
//         <Typography variant="body2" className={`text-${props.color}`} >{`${props.progress}% Completed`}</Typography>
//       </Box>
//     </Box>
//       </div>
//     );
//  }
const ProgressBar = (props) => {
    return (
        <div className="container pt-4 pb-2">
            <div className="row">
                <div className="col-12">
                    <div className="progress-wrapper">
                        <div className="progress-info info-xl">
                            <div className="progress-label">
                                <span className={`text-${props.color}`}> </span>
                            </div>
                            <div className="progress-percentage">
                                <span className={`text-${props.color} text-bold`}>
                                    {`${props.progress}% Completed`}
                                </span>
                            </div>
                        </div>
                        <div className="progress progress-xl">
                            <div className={`progress-bar bg-${props.color}`} role="progressbar" aria-valuenow={`${props.progress}`} aria-valuemin="0" aria-valuemax="100"> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
