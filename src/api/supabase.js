import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Make sure to set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =============== Authentication functions ===============

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const signUp = async (email, password, userData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    }
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
  
  return true;
};

export const resetPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  
  if (error) {
    throw error;
  }
  
  return true;
};

export const updateUserProfile = async (userData) => {
  const { data, error } = await supabase.auth.updateUser({
    data: userData
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};

// =============== Team functions ===============

export const getTeams = async () => {
  const { data, error } = await supabase
    .from('teams')
    .select('*');
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const getTeamById = async (teamId) => {
  const { data, error } = await supabase
    .from('teams')
    .select('*, team_members(*, user:user_id(id, email, user_metadata))')
    .eq('id', teamId)
    .single();
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const createTeam = async (teamData) => {
  const { data, error } = await supabase
    .from('teams')
    .insert([teamData])
    .select();
  
  if (error) {
    throw error;
  }
  
  return data[0];
};

export const updateTeam = async (teamId, teamData) => {
  const { data, error } = await supabase
    .from('teams')
    .update(teamData)
    .eq('id', teamId)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data[0];
};

export const deleteTeam = async (teamId) => {
  const { error } = await supabase
    .from('teams')
    .delete()
    .eq('id', teamId);
  
  if (error) {
    throw error;
  }
  
  return true;
};

// =============== Task functions ===============

export const getTasks = async (filters = {}) => {
  let query = supabase
    .from('tasks')
    .select('*, workflow:workflow_id(*), assigned_user:assigned_to(*)');
  
  // Apply filters
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  
  if (filters.priority) {
    query = query.eq('priority', filters.priority);
  }
  
  if (filters.assignedTo) {
    query = query.eq('assigned_to', filters.assignedTo);
  }
  
  if (filters.workflowId) {
    query = query.eq('workflow_id', filters.workflowId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const getTaskById = async (taskId) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*, workflow:workflow_id(*), assigned_user:assigned_to(*)')
    .eq('id', taskId)
    .single();
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const createTask = async (taskData) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([taskData])
    .select();
  
  if (error) {
    throw error;
  }
  
  return data[0];
};

export const updateTask = async (taskId, taskData) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(taskData)
    .eq('id', taskId)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data[0];
};

export const deleteTask = async (taskId) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);
  
  if (error) {
    throw error;
  }
  
  return true;
};

// =============== Report functions ===============

export const getReports = async (teamId = null) => {
  let query = supabase
    .from('reports')
    .select('*, created_by_user:created_by(*)');
  
  if (teamId) {
    query = query.eq('team_id', teamId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const getReportById = async (reportId) => {
  const { data, error } = await supabase
    .from('reports')
    .select('*, created_by_user:created_by(*), team:team_id(*)')
    .eq('id', reportId)
    .single();
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const createReport = async (reportData) => {
  const { data, error } = await supabase
    .from('reports')
    .insert([reportData])
    .select();
  
  if (error) {
    throw error;
  }
  
  return data[0];
};

export const updateReport = async (reportId, reportData) => {
  const { data, error } = await supabase
    .from('reports')
    .update(reportData)
    .eq('id', reportId)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data[0];
};

export const deleteReport = async (reportId) => {
  const { error } = await supabase
    .from('reports')
    .delete()
    .eq('id', reportId);
  
  if (error) {
    throw error;
  }
  
  return true;
};

// =============== Integration functions ===============

export const getIntegrations = async (teamId = null) => {
  let query = supabase
    .from('integrations')
    .select('*');
  
  if (teamId) {
    query = query.eq('team_id', teamId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  return data;
};

export const createIntegration = async (integrationData) => {
  const { data, error } = await supabase
    .from('integrations')
    .insert([integrationData])
    .select();
  
  if (error) {
    throw error;
  }
  
  return data[0];
};

export const updateIntegration = async (integrationId, integrationData) => {
  const { data, error } = await supabase
    .from('integrations')
    .update(integrationData)
    .eq('id', integrationId)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data[0];
};

export const deleteIntegration = async (integrationId) => {
  const { error } = await supabase
    .from('integrations')
    .delete()
    .eq('id', integrationId);
  
  if (error) {
    throw error;
  }
  
  return true;
};

// =============== User Settings functions ===============

export const getUserSettings = async (userId) => {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is the error for "No rows found"
    throw error;
  }
  
  return data || {};
};

export const updateUserSettings = async (userId, settingsData) => {
  // First check if settings exist
  const { data: existingSettings } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  
  let result;
  
  if (existingSettings) {
    // Update existing settings
    const { data, error } = await supabase
      .from('user_settings')
      .update(settingsData)
      .eq('user_id', userId)
      .select();
    
    if (error) {
      throw error;
    }
    
    result = data[0];
  } else {
    // Create new settings
    const { data, error } = await supabase
      .from('user_settings')
      .insert([{ user_id: userId, ...settingsData }])
      .select();
    
    if (error) {
      throw error;
    }
    
    result = data[0];
  }
  
  return result;
};

// =============== Analytics functions ===============

export const getWorkflowStats = async (teamId = null, timeRange = 'week') => {
  // This is a placeholder for a more complex analytics query
  // In a real application, you might use SQL functions or serverless functions
  // to calculate more complex statistics
  
  let query = supabase
    .from('workflows')
    .select('status, created_at')
    .gte('created_at', getTimeRangeDate(timeRange));
  
  if (teamId) {
    query = query.eq('team_id', teamId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  // Group and process the data
  const stats = {
    total: data.length,
    active: data.filter(w => w.status === 'active').length,
    inactive: data.filter(w => w.status === 'inactive').length,
    draft: data.filter(w => w.status === 'draft').length,
  };
  
  return stats;
};

export const getTaskStats = async (teamId = null, timeRange = 'week') => {
  // Similar placeholder for task statistics
  let query = supabase
    .from('tasks')
    .select('status, priority, created_at, workflow_id, workflows(team_id)')
    .gte('created_at', getTimeRangeDate(timeRange));
  
  if (teamId) {
    query = query.eq('workflows.team_id', teamId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  // Group and process the data
  const stats = {
    total: data.length,
    todo: data.filter(t => t.status === 'todo').length,
    inProgress: data.filter(t => t.status === 'in_progress').length,
    completed: data.filter(t => t.status === 'completed').length,
    blocked: data.filter(t => t.status === 'blocked').length,
    highPriority: data.filter(t => t.priority === 'high').length,
    mediumPriority: data.filter(t => t.priority === 'medium').length,
    lowPriority: data.filter(t => t.priority === 'low').length,
  };
  
  return stats;
};

// Helper function to get date for time range
function getTimeRangeDate(timeRange) {
  const now = new Date();
  switch (timeRange) {
    case 'day':
      return new Date(now.setDate(now.getDate() - 1)).toISOString();
    case 'week':
      return new Date(now.setDate(now.getDate() - 7)).toISOString();
    case 'month':
      return new Date(now.setMonth(now.getMonth() - 1)).toISOString();
    case 'quarter':
      return new Date(now.setMonth(now.getMonth() - 3)).toISOString();
    case 'year':
      return new Date(now.setFullYear(now.getFullYear() - 1)).toISOString();
    default:
      return new Date(now.setDate(now.getDate() - 7)).toISOString();
  }
}