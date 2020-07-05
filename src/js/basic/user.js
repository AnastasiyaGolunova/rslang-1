export default class User {
    constructor() {
        this.urlHeroku = 'https://afternoon-falls-25894.herokuapp.com';
    }

    async getSettings(userId) {
        const token = localStorage.getItem('token');
        console.log(token);
        const rawResponse = await fetch(`${this.urlHeroku}/users/${userId}/settings`,
            {
                method: "GET",
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );

        return await this.response(rawResponse);
        
    }
    
    async putSettings({userId, settings}) {
        const token = localStorage.getItem('token');
        const rawResponse = await fetch(`${this.urlHeroku}/users/${userId}/settings`, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });

        return await this.response(rawResponse);
           
    }

    async setSettingsData(value) {
        const userId = localStorage.getItem('userId');
        const data = {
            "userId": `${userId}`,
            "settings": { "wordsPerDay": `${value}`,
            "optional":{}
            },
        }

        let result = await this.putSettings(data);
        console.log(result)
    }
    
    async getStatistic(userId) {
        const token = localStorage.getItem('token');
        console.log(token);
        const rawResponse = await fetch(`${this.urlHeroku}/users/${userId}/statistics`,
            {
                method: "GET",
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );

        return await this.response(rawResponse);
    }
    
    async putStatistic({userId, statistics}) {
        const token = localStorage.getItem('token');
        const rawResponse = await fetch(`${this.urlHeroku}/users/${userId}/statistics`, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(statistics)
        });

        return await this.response(rawResponse);
    }

    async setStatisticData(value) {
        const userId = localStorage.getItem('userId');
        const data = {
            "userId": `${userId}`,
            "settings": { "learnedWords": `${value}`,
            "optional":{}
            },
        }

        let result = await this.putStatistic(data);
        console.log(result)
    }
}