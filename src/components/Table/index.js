import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  AddBox,
  ArrowDownward,
  Check, ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FirstPage,
  FilterList,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from '@material-ui/icons';
import MaterialTable from 'material-table'

export default function Table({ columns, options, data, title = "", components, detailPanel, actions }) {

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


  const tableLocalization = {
    pagination: {
      labelDisplayedRows: '{from}-{to} de {count}',
      labelRowsSelect: "linhas",
      labelRowsPerPage: "Linhas por página",
      firstAriaLabel: "Primeira Página",
      firstTooltip: "Primeira Página",
      previousAriaLabel: "Página Anterior",
      previousTooltip: "Página Anterior",
      nextAriaLabel: "Próxima Página",
      nextTooltip: "Próxima Página",
      lastAriaLabel: "Última Página",
      lastTooltip: "Última Página"
    },
    toolbar: {
      nRowsSelected: '{0} linha(s) selecionadas',
      addRemoveColumns: 'Adicionar ou remover colunas',
      showColumnsTitle: 'Exibir colunas',
      showColumnsAriaLabel: 'Exibir colunas',
      exportTitle: 'Exportar',
      exportAriaLabel: 'Exportar',
      exportName: 'Exportar para CSV',
      searchTooltip: 'Pesquisar',
      searchPlaceholder: 'Pesquisar',
    },
    header: {
      actions: 'Ações'
    },
    body: {
      emptyDataSourceMessage: 'Não há registros a serem exibidos',
      addTooltip: "Adicionar",
      deleteTooltip: "Deletar",
      editTooltip: "Editar",
      filterRow: {
        filterTooltip: 'Filtros'
      },
      editRow: {
        deleteText: "Tem certeza que deseja excluir essa linha?",
        cancelTooltip: "Cancelar",
        saveTooltip: "Salvar",
      }
    },
    grouping: {
      placeholder: "Arrastar cabeçalhos ...",
      groupedBy: "Agrupado por:"
    }
  }

  return (
    <MaterialTable
      columns={columns}
      data={data}
      title={title}
      icons={tableIcons}
      components={components}
      options={options}
      localization={tableLocalization}
      detailPanel={detailPanel}
      actions={actions}
    />);
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.object,
  title: PropTypes.string,
  components: PropTypes.object,
  detailPanel: PropTypes.array,
  actions: PropTypes.array,
};
