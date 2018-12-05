<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <span class="is-white"><i class="fa fa-th"></i></span>
        <!--<b-badge pill variant="warning">2</b-badge>-->
    </template>\
    <template slot="dropdown">
      <div class="gb_tb"></div>
      <div class="gb_sb"></div>
      <div class="gb_ba gb_aa gb_ua gb_ca gb_g" aria-label="Aplicaciones SIR" aria-hidden="false" 
        role="region" style="max-height: 432px; height: 352px;">
        <ul class="gb_da gb_6" aria-dropeffect="move">
          <li class="gb_T share_1" aria-grabbed="false" id="ogbkddg:0">
            <a class="gb_O" 
              href="https://myaccount.google.com/?utm_source=OGB&amp;authuser=0&amp;utm_medium=app" id="gb192">
              <div class="gb_2"></div>
              <div class="gb_3"></div>
              <div class="gb_4"></div>
              <div class="gb_5"></div>
              <span class="gb_W"><img src="../../assets/media/images/bank_check_payment_pen_payment.png" height="64" width="64"/></span>
              <span class="gb_X">Afiliación</span>
            </a>
          </li>
          <li class="gb_T" aria-grabbed="false" id="ogbkddg:1">
            <a class="gb_O" data-pid="23" draggable="false" href="https://mail.google.com/mail/?tab=wm&amp;authuser=0" id="gb23">
              <div class="gb_2"></div><div class="gb_3"></div>
              <div class="gb_4"></div><div class="gb_5"></div>
              <span class="gb_W" ><img src="../../assets/media/images/salary_date_calendar_scheduled_payment.png" height="64" width="64"/></span>
              <span class="gb_X">Cobranza</span>
            </a>
          </li>
          <li class="gb_T" aria-grabbed="false" id="ogbkddg:2">
            <a class="gb_O" data-pid="49" draggable="false" 
              href="https://drive.google.com/?tab=wo&amp;authuser=0" id="gb49">
              <div class="gb_2"></div>
              <div class="gb_3"></div>
              <div class="gb_4"></div>
              <div class="gb_5"></div>
              <span class="gb_W"><img src="../../assets/media/images/finance_money_budget_currency_rate.png" height="64" width="64"/></span>
              <span class="gb_X">Recaudación</span>
            </a>
          </li>
          <li class="gb_T" aria-grabbed="false" id="ogbkddg:3">
            <a class="gb_O" data-pid="25" draggable="false" 
              href="https://docs.google.com/document/?usp=docs_ald&amp;authuser=0" id="gb25">
              <div class="gb_2"></div>
              <div class="gb_3"></div>
              <div class="gb_4"></div>
              <div class="gb_5"></div>
              <span class="gb_W"></span>
              <span class="gb_X"></span>
            </a>
          </li>
          <!--<li class="gb_T" aria-grabbed="false" id="ogbkddg:3">
            <a class="gb_O" data-pid="25" draggable="false" 
              href="https://docs.google.com/document/?usp=docs_ald&amp;authuser=0" id="gb25">
              <div class="gb_2"></div>
              <div class="gb_3"></div>
              <div class="gb_4"></div>
              <div class="gb_5"></div>
              <span class="gb_W"><img src="../../assets/media/images/msdynamics.png" height="64" width="64"/></span>
              <span class="gb_X">CRM</span>
            </a>
          </li>
          <li class="gb_T" aria-grabbed="false" id="ogbkddg:4">
            <a class="gb_O" data-pid="283" draggable="false" 
              href="https://docs.google.com/spreadsheets/?usp=sheets_ald&amp;authuser=0" id="gb283">
              <div class="gb_2"></div>
              <div class="gb_3"></div>
              <div class="gb_4"></div>
              <div class="gb_5"></div>
              <span class="gb_W"></span>
              <span class="gb_X">SITC</span>
            </a>
          </li>
          <li class="gb_T" aria-grabbed="false" id="ogbkddg:5">
            <a class="gb_O" data-pid="281" draggable="false" 
              href="https://docs.google.com/presentation/?usp=slides_ald&amp;authuser=0" id="gb281">
              <div class="gb_2"></div>
              <div class="gb_3"></div>
              <div class="gb_4"></div>
              <div class="gb_5"></div>
              <span class="gb_W"><img src="../../assets/media/images/setting_user_interface.png" height="64" width="64"/></span>
              <span class="gb_X">Acsel-e</span>
            </a>
          </li>-->
        </ul>
        <div class="gb_qa">
          <div class="gb_Z gb_W" style="background-position:0 -2139px"></div>
          <div class="gb_ra"><div class="gb_sa">Aplicaciones externas</div>
            <table style="text-align: center; width : 100%;">
              <tr>
                <td style="width: 48px;">
                  <a class="gb_ta gb_cg" href="#">
                    <img src="../../assets/media/images/msdynamics.png" height="32" width="32"/><br> CRM
                  </a>
                </td>
                <td style="width: 48px;">
                  <a class="gb_ta gb_cg" href="#">
                    <img src="../../assets/media/images/setting_user_interface.png" height="32" width="32"/><br>SITC
                  </a>
                </td>
                <td style="width: 48px;">
                  <a class="gb_ta gb_cg" href="#">
                    <img src="../../assets/media/images/setting_user_interface.png" height="32" width="32"/><br>Acsele
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownModule',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { 
    }
  }
}
</script>
