import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';

interface Record {
  temperature: number;
  timestamp: number;
  datahora: string;
}

interface Config {
  currentTemp: number;
  relayDelay: number;
  relayOn: boolean;
  targetTemp: number;
  tempHysteresis: number;
}

@Injectable({
  providedIn: 'root'
})
export class FermentacaoService {

  constructor(private db: AngularFireDatabase) { }

  getRecentRecords(): Observable<any[]> {

    return this.db.list<Record>('records', f => f.orderByChild('timestamp')
      .startAt(this.getCurrentTime()))
      .valueChanges()
      .pipe(
        map(recs => recs
          .filter(rec => rec.timestamp > this.getCurrentTime())
          .map(rec => ({
            ...rec,
            datahora: this.convertEpochToString(rec.timestamp)
          }))
        )
      );
  }

  getConfig(): Observable<Config> {
    return this.db.object<Config>('/config').valueChanges().pipe(
      map(config => config || { currentTemp: 0, relayDelay: 0, relayOn: false, targetTemp: 0, tempHysteresis: 0 })
    );
  }

  updateConfig(data: any): Promise<void> {
    return this.db.object('config').update(data);
  }

  private getCurrentTime() {
    const startDate = new Date();
    //startDate.setMinutes(startDate.getMinutes() - 5);
    startDate.setHours(startDate.getHours() - 15);
    const startDateValue = Math.floor(startDate.getTime() / 1000);
    return startDateValue;
  }

  public convertEpochToString(epochTime: number) {
    if (epochTime < 10000000000) {
      epochTime *= 1000;
    }
    const date = new Date(epochTime);
    date.setHours(date.getHours() + 3);

    return date.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

}
