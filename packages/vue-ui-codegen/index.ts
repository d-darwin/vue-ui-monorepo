import generateConstants from './src/generators/constants';
import generateTypes from './src/generators/types';
import generateStyles from './src/generators/styles';
import log from "./src/utils/log";

// TODO: dont show success if there were errors
generateConstants().then(() => log("Constants were generated"));
generateTypes().then(() => log("Types were generated"));
generateStyles().then(() => log("Styles were generated"));
