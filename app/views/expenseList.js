<script type = "text/x-handlebars" id="expenseList" data-template-name="expenseList">
  
          <div class="col-md-1 billsAndIncome">

      </div>
    <div id="expenseListContainer"  class="col-md-10 expenseListContainer">

    {{view App.InnerExpenseButtonsView}}
        <h1>Expense List View</h1>
        You have a total of ${{sumOfBills}} to pay every month. While you have a total of ${{income}} coming in as revenue. This means you have ${{disposableIncome}} remaining to save.
          <table id="expenseListTable" class="table">
            <tr>
              <th>Expense Name</th>
              <th>Expense Frequency</th>
              <th>Date</th>
              <th>Expense Amount</th>
              <th>Expense Assignee</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {{#each itemController = "expenseItemList"}}
            <tr>

              <td colspan="1" {{bind-attr class="isEditing:editing"}}>
                {{#if isEditing}}
                  {{edit-expense class="edit" value=expenseName focus-out="acceptExpenseChanges" insert-newline="acceptExpenseChanges"}}
                {{else}}
                  <p {{action "editExpenseName" on="doubleClick" }}>{{expenseName}}</p>
                {{/if}}
              </td>

              <td colspan="1" {{bind-attr class="isEditingFrequency:editing"}}>
                {{#if isEditingFrequency}}
                  {{view App.CalendarDatePicker value=expenseFrequency insert-newline="accept"}}
                {{else}}
                  <p {{action "editExpenseFrequency" on="doubleClick" }}>{{expenseFrequency}}</p>
                {{/if}}
              </td>

              <td colspan="1" {{bind-attr class="isEditingDate:editing"}}>
                {{#if isEditingDate}}
                  {{view App.CalendarDatePicker value=expenseDate insert-newline="accept"}}
                {{else}}
                  <p {{action "editExpenseDate" on="doubleClick" }}>{{expenseDate}}</p>
                {{/if}}
              </td>

              <td colspan="1">
                {{#if isEditingAmount}}
                  {{edit-expense class="edit" value=expenseAmount focus-out="acceptExpenseAmountChanges" insert-newline="acceptExpenseAmountChanges"}}
                {{else}}
                  <p {{action "editExpenseAmount" on="doubleClick" }}>${{expenseAmount}}</p>
                {{/if}}
              </td>

              <td colspan="1" {{bind-attr class="isEditingDate:editing"}}>
                {{#if isEditingAssignee}}
                  {{view App.CalendarDatePicker value=expenseAssignee insert-newline="accept"}}
                {{else}}
                  <p {{action "editExpenseAssignee" on="doubleClick" }}>{{expenseAssignee}}</p>
                {{/if}}
              </td>

                <td colspan="1"><button class="btn btn-xs btn-info" {{action 'editExpense'}}>edit</button></td>
                <td class="deleteColumn" width="200">
                {{delete-expense action="confirmExpenseDelete" cancel="cancelExpenseDelete"}}
                </td>
            </tr>
            {{/each}}
          <tfoot>
            <tr>
              <td colspan="3">Total</td>
              <td colspan="1">{{sumOfBills}}</td>
            </tr>
            <tr>
              <td colspan="1">{{expenseTotal}}</td>
            </tr>
          </tfoot>

          </table>


      </div>

       <div id="quickStatsSouth" class="col-md-10 quickStatsSouth">
        <div class="col-md-3 col-md-offset-1">
          <p><span class="largeOrangeNumbers">${{sumOfBills}}</span>/<span class="smallBlueNumbers">$3,234.84</span></p>
        </div>
        <div class="col-md-3 ">
          <p><span class="largeOrangeNumbers">$34,345.95</span>/<span class="smallBlueNumbers">$3,234.84</span></p>
        </div>
        <div class="col-md-3 ">
          <p><span class="largeOrangeNumbers">$34,345.95</span>/<span class="smallBlueNumbers">$3,234.84</span></p>
        </div>
      </div>

      <div id="incomeStatsTable" class="col-md-10 incomeStatsTable">
        <table class="table">
          <tr>
            <th class=""></th>
            <th class="">This vs. That</th>
            <th class="">This vs. That</th>
            <th>This vs. That</th>
          </tr>
          <tr>
            <td class="rightBorderTableCell leftBorderTableCell"><span class="smallBlueNumbers">November 13th</span></td>
            <td class="rightBorderTableCell"><span class="smallBlueNumbers">$3,234.84</span></td>
            <td class="rightBorderTableCell"><span class="smallBlueNumbers">$3,234.84</span></td>
            <td><span class="smallBlueNumbers">$3,234.84</span></td>
          </tr>
          <tr>
            <td class="rightBorderTableCell leftBorderTableCell"><span class="smallBlueNumbers">November 13th</span></td>
            <td class="rightBorderTableCell"><span class="smallBlueNumbers">$3,234.84</span></td>
            <td class="rightBorderTableCell"><span class="smallBlueNumbers">$3,234.84</span></td>
            <td><span class="smallBlueNumbers">$3,234.84</span></td>
          </tr>
          <tr>
            <td class="rightBorderTableCell leftBorderTableCell"><span class="smallBlueNumbers">November 13th</span></td>
            <td class="rightBorderTableCell"><span class="smallBlueNumbers">$3,234.84</span></td>
            <td class="rightBorderTableCell"><span class="smallBlueNumbers">$3,234.84</span></td>
            <td><span class="smallBlueNumbers">$3,234.84</span></td>
          </tr>
        </table>
  </div>
</script>