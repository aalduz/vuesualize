import Welcome from './Components/Welcome/Welcome.vue';
import Header from './Components/Header/Header.vue';

const User = resolve => {
    require.ensure(['./Components/User/User.vue'], () => {
        resolve(require('./Components/User/User.vue'));
    });
};

const SignupPage = resolve => {
    require.ensure(['./Components/Auth/SignUp.vue'], () => {
        resolve(require('./Components/Auth/SignUp.vue'));
    });
};

const SigninPage = resolve => {
    require.ensure(['./Components/Auth/Signin.vue'], () => {
        resolve(require('./Components/Auth/Signin.vue'));
    });
};

const Journey = resolve => {
    require.ensure(['./Components/Journey/Journey.vue'], () => {
        resolve(require('./Components/Journey/Journey.vue'));
    });
};

const JourneyNew = resolve => {
    require.ensure(['./Components/Journey/JourneyNew.vue'], () => {
        resolve(require('./Components/Journey/JourneyNew.vue'));
    });
};

const JourneyDetail = resolve => {
    require.ensure(['./Components/Journey/JourneyDetail.vue'], () => {
        resolve(require('./Components/Journey/JourneyDetail.vue'));
    });
};

const JourneyForm = resolve => {
    require.ensure(['./Components/Journey/JourneyForm.vue'], () => {
        resolve(require('./Components/Journey/JourneyForm.vue'));
    });
};
export const routes = [
    { path: '', name: 'welcome', components: {
        default: Welcome,
        'header-top': Header
    } },
    { path: '/signup', component: SignupPage },
    { path: '/signin', component: SigninPage },
    { 
        path: '/user',
        components: {
            default: User,
            'header-bottom': Header
        },
        meta: {
            requiresAuth: true
        }
    },
    { path: '/journey', components: {
        default: Journey,
        'header-top': Header
    } },
    { path: '/journey/new', components: {
        default: JourneyNew,
        'header-top': Header
    } },
    { path: '/journey/:id', components: {
        default: JourneyDetail,
        'header-top': Header
    }, props: true },
    { path: '*', redirect: '/' }

];