import generateConstants from './src/generators/constants';
import generateTypes from './src/generators/types';
import generateStyles from './src/generators/styles';
import log from "./src/utils/log";

generateConstants().then(() => log("Constants were generated"));
generateTypes().then(() => log("Types were generated"));
generateStyles().then(() => log("Styles were generated"));
