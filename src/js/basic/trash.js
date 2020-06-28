import {study} from '../index';

export default class Trash {

    async remove(value) {
        const {_id} = study.arrayStudy[study.count];
        console.log(study.arrayStudy[study.count])
        console.log(_id);
        const userId = localStorage.getItem('userId');
        const dataRemove = {
            "userId": `${userId}`,
            "wordId": `${_id}`,
            "word": {
                "optional": {
                    "delete": value
                }
              }
        }
  
        let result = await study.createUserWord(dataRemove);
        if (result === null) {
            result = await study.updateUserWord(dataRemove);
        }
        
        console.log(result);
    }

    
}