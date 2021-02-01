const sequelize = require('../../config/connection');
const { User, Goal, Student, StudentGoal, Trial } = require('../../models');

const goaldata = [
    {
        name: 'Articulation - X',
        description: 'Will use X sound in isolation',
        user_id: 1
    },
    {
        name: 'Phonology- Consonant Deletion',
        description: 'Will reduce the process of final consonant deletion by producing all age-appropriate consonants in the final position of words',
        user_id: 1
    },
    {
        name: 'Expressive Language - Article Agreement',
        description: 'Will use article agreement',
        user_id: 2
    },
    {
        name: 'Expressive Language - Question Words',
        description: 'Will answer "wh" questions after listening to a short story',
        user_id: 3
    },
    {
        name: 'Fluency- Speed',
        description: 'Will determine if the therapist is using “fast” or "slow" speech',
        user_id: 4
    },
    {
        name: 'Fluency- Types of Speech',
        description: 'Will identify different types of speech (bumpy/smooth, fast/slow)',
        user_id: 4
    },
    {
        name: 'Stuttering- Cancellation',
        description: 'Will user cancellation in conversation',
        user_id: 6
    },
    {
        name: 'Volume',
        description: 'Will approximate target volume level in words',
        user_id: 6
    },
    {
        name: 'Pitch',
        description: 'Will imitate optimum pitch in syllables, words, phrases and sentences',
        user_id: 6
    }
];

const seedGoals = () => Goal.bulkCreate(goaldata, {individualHooks: true});

module.exports = seedGoals;