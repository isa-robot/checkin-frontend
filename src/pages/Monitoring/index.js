import React, { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import {
  CircularProgress,
  CardContent,
  Box,
  Typography,
  IconButton
} from '@material-ui/core';
import {
  ExpandMore,
  Event
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Area,
  Bar,
  LabelList,
  Label,
} from 'recharts';
import { subDays, formatISO, format, parseISO } from 'date-fns';
import api from '~/services/api';
import {
  Loading,
  Container,
  Card,
  CardHeader,
  Chart,
  Scroll,
  ContentTooltipChart,
  TextTooltipChart,
  ListSymptoms
} from './styles';

import Table from "~/components/Table";
import DatePicker from '~/components/DatePicker'

const useStyles = makeStyles({
  usersListCard: {
    overflow: 'visible'
  },
  tablePicker: {
    '& .react-datepicker-popper': {
      zIndex: '99',
      left: '-28px !important'
    }
  }
})

export default function Monitoring() {
  const classes = useStyles();
  const [keycloak] = useKeycloak();
  const [date, setDate] = useState(new Date());
  const [loadedUsers, setLoadedUsers] = useState(false);
  const [loadedAccession, setLoadedAccession] = useState(false);
  const [loadedSymptoms, setLoadedSymptom] = useState(false);
  const [loadedApprovedNotApproved, setLoadedApprovedNotApproved] = useState(
    false
  );
  const [usersData, setUsersData] = useState([]);
  const [approvedNotApprovedData, setApprovedNotApprovedData] = useState([]);
  const [accessionData, setAccessionData] = useState([]);
  const [usersSymptoms, setUsersSymptoms] = useState([]);
  const [startDate] = useState(
    formatISO(subDays(new Date(), 7), { representation: 'date' })
  );
  const [endDate] = useState(
    formatISO(subDays(new Date(), 1), { representation: 'date' })
  );

  const options = {
    filtering: true,
    grouping: false,
  };

  const detailPanel = [
    rowData => ({
      disabled: rowData.approved !== "Negado",
      icon: () => <ExpandMore style={{ display: rowData.approved !== "Negado" ? "none" : "" }}></ExpandMore>,
      tooltip: 'Detalhes',
      render: rowData => {
        if (rowData.diary) {
          return (
            <Box margin={1}>
              <Typography variant="body1" gutterBottom component="div">
                Sintomas
              </Typography>
              <ListSymptoms>
                {
                  rowData.diary.smellLoss ? (<li>Perda do olfato</li>) : ("")
                }
                {
                  rowData.diary.tasteLoss ? (<li>Perda do paladar</li>) : ("")
                }
                {
                  rowData.diary.appetiteLoss ? (<li>Perda de apetite</li>) : ("")
                }
                {
                  rowData.diary.fatigue ? (<li>Cansaço</li>) : ("")
                }
                {
                  rowData.diary.fever ? (<li>Febre</li>) : ("")
                }
                {
                  rowData.diary.cough ? (<li>Tosse persistente</li>) : ("")
                }
                {
                  rowData.diary.delirium ? (<li>Delírios</li>) : ("")
                }
                {
                  rowData.diary.soreThroat ? (<li>Rouquidão</li>) : ("")
                }
                {
                  rowData.diary.shortnessOfBreath ? (<li>Falta de ar</li>) : ("")
                }
                {
                  rowData.diary.chestPain ? (<li>Dor torácica</li>) : ("")
                }
              </ListSymptoms>
            </Box>
          )
        } else {
          return ""
        }
      },
    })
  ];

  const columns = [
    {
      field: "name",
      title: "Nome",
      filtering: false
    },
    {
      field: "email",
      title: "E-mail",
      filtering: false
    },
    {
      field: "phone",
      title: "Celular",
      filtering: false
    },
    {
      field: "hour",
      title: "Horário",
      filtering: false,
      render: rowData => (format(new Date(rowData.hour), 'HH:mm'))
    },
    {
      field: "approved",
      title: "Status",
      lookup: { Indefinido: 'Indefinido', Permitido: 'Permitido', Negado: "Negado" },
      render: rowData => (
        rowData.approved === "Indefinido" ? <p style={{ color: "#FFD600", fontWeight: "bold" }}>Indefinido</p> :
          rowData.approved === "Permitido" ? <p style={{ color: "#22BA71", fontWeight: "bold" }}>Permitido</p> :
            <p style={{ color: "#C54A48", fontWeight: "bold" }}>Negado</p>
      )
    }
  ];

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/establishments/graphics/users/${formatISO(date, { representation: 'date' })}`, {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });
      setUsersData(response.data);
      setLoadedUsers(true);
    }
    fetchData();
  }, [date]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/establishments/graphics/symptoms/', {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      });
      setUsersSymptoms(response.data);
      setLoadedSymptom(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(
        `/establishments/graphics/approved-not-approved/${startDate}/${endDate}`,
        {
          headers: { Authorization: `Bearer ${keycloak.token}` },
        });

      setApprovedNotApprovedData(response.data);
      setLoadedApprovedNotApproved(true);
    }
    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(
        `/establishments/graphics/accession/${startDate}/${endDate}`, {
          headers: { Authorization: `Bearer ${keycloak.token}` },
        }
      );
      setAccessionData(response.data);
      setLoadedAccession(true);
    }
    fetchData();
  }, [startDate, endDate]);

  function setLoadedAll() {
    return (
      loadedUsers &&
      loadedApprovedNotApproved &&
      loadedAccession &&
      loadedSymptoms
    );
  }

  const CustomTooltipAccession = ({ active, payload, label }) => {
    if (active) {
      return (
        <ContentTooltipChart>
          <p>{format(new Date(parseISO(label)), 'dd/MM/yyyy')}</p>
          {payload.map(pay => (
            <>
              <TextTooltipChart
                key={pay.color}
                color={pay.color}
              >{`Percentual : ${pay.value}%`}</TextTooltipChart>
              <TextTooltipChart key="Users">{`${pay.name} : ${pay.payload.accession.users}`}</TextTooltipChart>
            </>
          ))}
        </ContentTooltipChart>
      );
    }

    return null;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <ContentTooltipChart>
          <p>{format(new Date(parseISO(label)), 'dd/MM/yyyy')}</p>
          {payload.map(pay => (
            <TextTooltipChart
              key={pay.color}
              color={pay.color}
            >{`${pay.name} : ${pay.value}%`}</TextTooltipChart>
          ))}
        </ContentTooltipChart>
      );
    }

    return null;
  };

  const CustomTooltipTotal = ({ active, payload, label }) => {
    if (active) {
      return (
        <ContentTooltipChart>
          {payload.map(pay => {
            return (
              <TextTooltipChart key={pay.color} color={pay.color}>
                {`${label} : ${pay.value}`}
              </TextTooltipChart>
            );
          })}
        </ContentTooltipChart>
      );
    }

    return null;
  };

  function formatIntervalDate() {
    return `${format(new Date(startDate), 'dd/MM')} até ${format(
      new Date(endDate),
      'dd/MM'
    )}`;
  }

  function formatDate() {
    return format(date, 'dd/MM');
  }

  function formatDateSymptoms() {
    return `até ${format(new Date(endDate), 'dd/MM')}`;
  }

  return (
    <>
      {setLoadedAll() ? (
        <Container>
          <Scroll>
            <Card>
              <CardHeader title="Adesão" subheader={formatIntervalDate()} />
              <CardContent>
                <Chart>
                  <ResponsiveContainer>
                    <AreaChart data={accessionData}>
                      <defs>
                        <linearGradient
                          id="colorRed"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="20%"
                            stopColor="#C54A48"
                            stopOpacity={0.3}
                          />
                          <stop offset="80%" stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <defs>
                        <linearGradient
                          id="colorOne"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="20%"
                            stopColor="#82ca9d"
                            stopOpacity={0.3}
                          />
                          <stop offset="80%" stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        tick={{ stroke: '#383A3D' }}
                        stroke="#6f6f6f"
                        tickFormatter={label => {
                          return format(new Date(parseISO(label)), 'dd/MM');
                        }}
                      />
                      <YAxis
                        stroke="#6f6f6f"
                        tick={{ stroke: '#383A3D' }}
                        unit="%"
                      />
                      <Tooltip content={<CustomTooltipAccession />} />
                      <Legend />
                      <Area
                        type="monotone"
                        name="Usuários"
                        dataKey="accession.value"
                        stroke="#82ca9d"
                        fill="url(#colorOne)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Chart>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="Acesso Permitido X Negado"
                subheader={formatIntervalDate()}
              />
              <CardContent>
                <Chart>
                  <ResponsiveContainer>
                    <AreaChart data={approvedNotApprovedData}>
                      <XAxis
                        dataKey="date"
                        tick={{ stroke: '#383A3D' }}
                        stroke="#6f6f6f"
                        tickFormatter={label => {
                          return format(new Date(parseISO(label)), 'dd/MM');
                        }}
                      />
                      <YAxis stroke="#6f6f6f" tick={{ stroke: '#383A3D' }} allowDecimals={false} unit="%" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area
                        type="monotone"
                        name="Permitido"
                        dataKey="approved"
                        stroke="#82ca9d"
                        fill="url(#colorOne)"
                      />
                      <Area
                        type="monotone"
                        name="Negado"
                        dataKey="notApproved"
                        stroke="#C54A48"
                        fill="url(#colorRed)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Chart>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Sintomas" subheader={formatDateSymptoms()} />
              <CardContent>
                {usersSymptoms.length > 0 ?
                  <Chart>
                    <ResponsiveContainer>
                      <BarChart data={usersSymptoms} layout="vertical">
                        <YAxis
                          dataKey="symptom"
                          tick={false}
                          stroke="#6f6f6f"
                          type="category"
                        >
                          <Label value="Sintomas" offset={0} position="insideLeft" angle={Number(-90)} />
                        </YAxis>
                        <XAxis stroke="#6f6f6f" tick={{ stroke: '#383A3D' }} type="number" />
                        <Tooltip content={<CustomTooltipTotal />} />
                        <Legend />
                        <Bar
                          name="Usuários"
                          dataKey="value"
                          fill="#C54A48"
                          stackId="a"
                          fillOpacity={0.4}
                          stroke="none"
                        >
                          <LabelList dataKey="symptom" position="end" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Chart>
                  : "Nenhum sintoma relatado"
                }
              </CardContent>
            </Card>
            <Card className = { classes.usersListCard }>
              <CardHeader title="Lista de Usuários" subheader={formatDate()} />
              <Table
                columns={columns}
                data={usersData}
                components={{
                  Container: props => <CardContent>{props.children}</CardContent>,
                  Actions: props => <div className = { classes.tablePicker } {...props}>
                      <DatePicker
                        name="date"
                        dateFormat="Pp"
                        maxDate={ new Date()}
                        initialValue={ date }
                        onChange={ newDate => setDate(newDate) }
                        customInput={ <IconButton><Event /></IconButton> }
                      />
                    </div>
                }}
                options={{...options, toolbarButtonAlignment: "left"}}
                detailPanel={detailPanel}
              />
            </Card>
          </Scroll>
        </Container>
      ) : (
          <Loading>
            <CircularProgress size="5rem" color="primary" />
          </Loading>
        )
      }
    </>
  );
}
