import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FermentacaoService } from './fermentacao.service';
import { LegendPosition } from '@swimlane/ngx-charts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fermentacao',
  templateUrl: './fermentacao.component.html',
  styleUrls: ['./fermentacao.component.scss']
})
export class FermentacaoComponent implements OnInit {

  configForm: FormGroup;

  relayOn = false;
  currentTemp = 0;
  lastRead = '';

  data: any[] = [];
  dataRelay: any[] = [];
  showXAxis = false;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Data';
  showYAxisLabel = false;
  yAxisLabel = 'Temperatura';
  autoScale = true;
  legendPosition = LegendPosition.Below;
  showGrid = false;
  roundDomains = true;

  constructor(private dataService: FermentacaoService,
    private fb: FormBuilder,
    private toastr: ToastrService) {

    this.configForm = this.fb.group({
      geladeira: false,
      relayDelay: 0,
      targetTemp: 0,
      tempHysteresis: 0
    });
  }

  ngOnInit() {

    this.dataService
      .getRecentRecords()
      .subscribe(records => {
        const series = records.map(r => ({
          name: r.datahora,
          value: r.temperature
        }));
        const seriesRelay = records.map(r => ({
          name: r.datahora,
          value: r.relayOn
        }));
        this.data = [{
          name: 'Temperatura',
          series: series
        }];
        this.dataRelay = [{
          name: 'Relay',
          series: seriesRelay
        }];
        this.lastRead = series.at(-1)?.name;
      });

    this.dataService.getConfig().subscribe(config => {
      this.configForm.patchValue(config);
      this.relayOn = config.relayOn;
      this.currentTemp = config.currentTemp;
    });
  }

  saveConfig(): void {
    const config = this.configForm.getRawValue(); // Obtém todos os valores, incluindo os desabilitados
    delete config.geladeira; // Remove o campo 'geladeira' para não enviá-lo ao Firebase

    this.dataService.updateConfig(config)
      .then(() => this.toastr.success('Configuração salva com sucesso!'))
      .catch(error => this.toastr.error(error, 'Erro ao salvar configuração!'));
  }

}
